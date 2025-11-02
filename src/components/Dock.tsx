'use client';

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

export type DockItemData = {
    icon: React.ReactNode;
    label: React.ReactNode;
    onClick: () => void;
    className?: string;
};

export type DockProps = {
    items: DockItemData[];
    className?: string;
    distance?: number;
    panelHeight?: number;
    baseItemSize?: number;
    dockHeight?: number;
    magnification?: number;
    spring?: SpringOptions;
};

type DockItemProps = {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    mouseX: MotionValue<number>;
    spring: SpringOptions;
    distance: number;
    baseItemSize: number;
    magnification: number;
};

function DockItem({
    children,
    className = '',
    onClick,
    mouseX,
    spring,
    distance,
    magnification,
    baseItemSize
}: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - rect.width / 2;
    });

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    );

    // ensure a sensible min size for accessibility/tap targets
    const clampedTargetSize = useTransform(targetSize, v => Math.max(44, v));
    const size = useSpring(clampedTargetSize, spring);

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size,
                touchAction: 'manipulation' // improve touch responsiveness on mobile
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className={`relative inline-flex items-center justify-center rounded-full bg-[#060010] border-neutral-700 border-2 shadow-md ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, child =>
                React.isValidElement(child)
                    ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
                    : child
            )}
        </motion.div>
    );
}

type DockLabelProps = {
    className?: string;
    children: React.ReactNode;
    isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isHovered) return;
        const unsubscribe = isHovered.on('change', latest => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

type DockIconProps = {
    className?: string;
    children: React.ReactNode;
    isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
    return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 64,
    dockHeight = 256,
    baseItemSize = 50
}: DockProps) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    // detect mobile to adjust sizes & layout
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const apply = () => setIsMobile(mq.matches);
        apply();
        mq.addEventListener?.('change', apply);
        return () => mq.removeEventListener?.('change', apply);
    }, []);

    // adapt values for touch / small screens (ensures tap target >=44px)
    const effectiveBaseItemSize = isMobile ? Math.max(56, baseItemSize) : baseItemSize;
    const effectiveMagnification = isMobile ? Math.max(magnification + 16, magnification) : magnification;
    const effectiveDistance = isMobile ? Math.min(distance, 120) : distance;

    const maxHeight = useMemo(
        () => Math.max(dockHeight, effectiveMagnification + effectiveMagnification / 2 + 4),
        [effectiveMagnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    // container classes:
    // - on mobile: fixed bottom full-width, touch-friendly padding
    // - on desktop: centered floating dock
    const containerClass = `${className ? className + ' ' : ''} ${
        isMobile
            ? 'fixed left-3 right-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border-neutral-700 border-2 py-2 px-3 bg-background/90 shadow-xl backdrop-blur'
            : 'absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-8 rounded-2xl border-neutral-700 border-2 py-4 px-8 bg-background/90 shadow-xl'
    }`;

    return (
        <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center justify-center pointer-events-auto">
            <motion.div
                // pointer handlers so hover / magnify works on touch devices
                onPointerMove={(e) => {
                    if (typeof e.clientX === 'number') mouseX.set(e.clientX);
                }}
                onPointerDown={() => {
                    isHovered.set(1);
                }}
                onPointerUp={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                onPointerLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={containerClass}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        // increase spacing on mobile, keep custom classes
                        className={`${isMobile ? 'mx-1' : 'mx-2'} ${item.className || ''}`}
                        mouseX={mouseX}
                        spring={spring}
                        distance={effectiveDistance}
                        magnification={effectiveMagnification}
                        baseItemSize={effectiveBaseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        {/* hide persistent labels on small screens; rely on tooltip */}
                        <DockLabel className={isMobile ? 'hidden' : ''}>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}



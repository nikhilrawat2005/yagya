'use client';

import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';

export interface GlowInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  floatingLabel?: boolean;
  error?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

export function GlowInput({
  id,
  label,
  floatingLabel = false,
  error,
  helperText,
  leadingIcon,
  trailingSlot,
  containerClassName = '',
  inputClassName = '',
  value,
  defaultValue,
  placeholder,
  onFocus,
  onBlur,
  ...rest
}: GlowInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const [focused, setFocused] = useState(false);

  const hasValue =
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'number' && !Number.isNaN(value)) ||
    (typeof defaultValue === 'string' && defaultValue.length > 0);
  const labelFloated = focused || hasValue;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && !floatingLabel && (
        <label
          htmlFor={inputId}
          className={`block font-ui-label text-[10px] mb-1.5 transition-colors duration-200 ${
            error ? 'text-flame' : focused ? 'text-peach' : 'text-apricot/85'
          }`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative rounded-[6px] border transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-smooth)] bg-[#F6EFE2]/[0.10] oat-sheet-blur ${
          error
            ? 'border-flame shadow-[0_0_0_2px_rgba(223,127,37,0.28)]'
            : focused
            ? 'border-peach shadow-[0_0_0_2px_rgba(246,239,226,0.16),0_0_18px_-2px_var(--glow-flame)]'
            : 'border-white/25 hover:border-apricot/45'
        }`}
      >
        {leadingIcon && (
          <span
            className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
              focused ? 'text-peach' : 'text-oat/65'
            }`}
          >
            {leadingIcon}
          </span>
        )}

        {label && floatingLabel && (
          <label
            htmlFor={inputId}
            className={`pointer-events-none absolute transition-all duration-200 ease-[var(--ease-smooth)] origin-left ${
              leadingIcon ? 'left-10' : 'left-3.5'
            } ${
              labelFloated
                ? 'top-1.5 text-[10px] font-ui-label tracking-[0.08em]'
                : 'top-1/2 -translate-y-1/2 text-base md:text-sm font-sans'
            } ${error ? 'text-flame' : focused ? 'text-peach' : 'text-apricot/75'}`}
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          placeholder={floatingLabel && !focused ? '' : placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={`w-full min-h-[48px] bg-transparent text-oat placeholder:text-apricot/50 focus:outline-none rounded-[inherit] ${
            floatingLabel ? 'pt-6 pb-2' : 'py-2.5'
          } ${leadingIcon ? 'pl-10' : 'px-3.5'} ${trailingSlot ? 'pr-11' : 'pr-3.5'} text-base md:text-sm ${inputClassName}`}
          {...rest}
        />

        {trailingSlot && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
            {trailingSlot}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            id={errorId}
            key="error"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASE.smooth }}
            className="text-flame text-[11px] font-sans font-medium mt-1.5"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            key="helper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-apricot/70 text-[11px] font-sans mt-1.5"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export interface GlowTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  floatingLabel?: boolean;
  error?: string;
  containerClassName?: string;
}

export function GlowTextarea({
  id,
  label,
  floatingLabel = false,
  error,
  containerClassName = '',
  className = '',
  value,
  defaultValue,
  placeholder,
  onFocus,
  onBlur,
  ...rest
}: GlowTextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const [focused, setFocused] = useState(false);

  const hasValue =
    (typeof value === 'string' && value.length > 0) ||
    (typeof defaultValue === 'string' && defaultValue.length > 0);
  const labelFloated = focused || hasValue;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && !floatingLabel && (
        <label
          htmlFor={inputId}
          className={`block font-ui-label text-[10px] mb-1.5 transition-colors duration-200 ${
            error ? 'text-flame' : focused ? 'text-peach' : 'text-apricot/85'
          }`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative rounded-[6px] border transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-smooth)] bg-[#F6EFE2]/[0.10] oat-sheet-blur ${
          error
            ? 'border-flame shadow-[0_0_0_2px_rgba(223,127,37,0.28)]'
            : focused
            ? 'border-peach shadow-[0_0_0_2px_rgba(246,239,226,0.16),0_0_18px_-2px_var(--glow-flame)]'
            : 'border-white/25 hover:border-apricot/45'
        }`}
      >
        {label && floatingLabel && (
          <label
            htmlFor={inputId}
            className={`pointer-events-none absolute left-4 transition-all duration-200 ease-[var(--ease-smooth)] ${
              labelFloated
                ? 'top-2 text-[10px] font-ui-label tracking-[0.08em]'
                : 'top-3.5 text-base md:text-sm font-sans'
            } ${error ? 'text-flame' : focused ? 'text-peach' : 'text-apricot/75'}`}
          >
            {label}
          </label>
        )}

        <textarea
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          placeholder={floatingLabel && !focused ? '' : placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={`w-full bg-transparent text-base md:text-sm text-oat placeholder:text-apricot/50 focus:outline-none rounded-[inherit] px-4 ${
            floatingLabel ? 'pt-6 pb-3' : 'py-3'
          } ${className}`}
          {...rest}
        />
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={errorId}
            key="error"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASE.smooth }}
            className="text-flame text-[11px] font-sans font-medium mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

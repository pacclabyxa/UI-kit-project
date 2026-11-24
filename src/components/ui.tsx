import { styled, keyframes, css } from 'styled-components';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const ButtonBase = styled.button<{ $variant: Variant; $size: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  ${({ $size }) => ({
    sm: css`padding: 7px 10px; font-size: 13px;`,
    md: css`padding: 10px 14px; font-size: 14px;`,
    lg: css`padding: 13px 18px; font-size: 16px;`,
  })[$size]}
  ${({ $variant, theme }) => ({
    primary: css`background: ${theme.colors.primary}; color: ${theme.colors.primaryText}; &:hover:not(:disabled) { background: ${theme.colors.primaryHover}; }`,
    secondary: css`background: ${theme.colors.secondary}; color: ${theme.colors.text};`,
    outline: css`background: transparent; color: ${theme.colors.text}; border-color: ${theme.colors.border};`,
    ghost: css`background: transparent; color: ${theme.colors.text};`,
  })[$variant]}
  &:disabled { opacity: 0.7; }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;
const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  @media (prefers-reduced-motion: reduce) { animation-duration: 1.5s; }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <ButtonBase $variant={variant} $size={size} disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading && <Spinner aria-hidden="true" />}
      {children}
    </ButtonBase>
  );
}

export const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
`;

export const Card = styled.article`
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  &::placeholder { color: ${({ theme }) => theme.colors.muted}; }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  @media (min-width: 520px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 800px) { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1100px) { grid-template-columns: repeat(4, 1fr); }
`;

const getAttrs = (className, size) => {
  const cls = className ? `class="${className}"` : "";
  const style = size ? `style="width:${size}px; height:${size}px;"` : "";
  return `${cls} ${style}`.trim();
};

export const IconHeart = ({ className = "", size = null } = {}) => `
<svg ${getAttrs(
  className,
  size
)} width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" stroke-width="2" fill="none" stroke="black">
  <path d="M12.24 2.6c-1.24 0-2.44.53-3.24 1.38-.8-.85-2-1.38-3.24-1.38-2.27 0-4.06 1.69-4.06 3.88 0 1.33.63 2.53 1.71 3.79 1.08 1.26 2.63 2.6 4.48 4.2L9 15.43l1.06-.96c1.85-1.6 3.4-2.94 4.48-4.2 1.08-1.26 1.71-2.46 1.71-3.79 0-2.19-1.79-3.88-4.06-3.88z" />
</svg>
`;

export const IconEdit = ({ className = "", size = null } = {}) => `
<svg ${getAttrs(
  className,
  size
)} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M0.77154 10.7999C0.570974 10.7999 0.373495 10.7212 0.226156 10.5738C0.0078486 10.3555 -0.0592636 10.0285 0.0549044 9.7415L1.59771 5.88447C1.63706 5.78805 1.69491 5.69933 1.76897 5.62605L7.1688 0.226215C7.47042 -0.0754049 7.95795 -0.0754049 8.25957 0.226215L10.5738 2.54043C10.8754 2.84205 10.8754 3.32958 10.5738 3.6312L7.48816 6.71682C7.18654 7.01844 6.69902 7.01844 6.3974 6.71682C6.09578 6.4152 6.09578 5.92767 6.3974 5.62605L8.93764 3.08581L7.71419 1.86237L2.97236 6.60496L2.15621 8.64379L4.19581 7.82841L4.3092 7.71424L4.08318 7.48822C3.78156 7.1866 3.78156 6.69908 4.08318 6.39746C4.3848 6.09584 4.87233 6.09584 5.17395 6.39746L5.94535 7.16886C6.24697 7.47048 6.24697 7.95801 5.94535 8.25963L5.17395 9.03103C5.09989 9.10509 5.01195 9.16294 4.91476 9.20228L1.05773 10.7451C0.965162 10.7821 0.867965 10.7999 0.77154 10.7999Z"
    fill="currentColor"
  />
</svg>`;

export const IconCross = ({ className = "", size = null } = {}) => `
<svg ${getAttrs(
  className,
  size
)} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M0.801758 0.799805L7.94726 7.9453"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
  />
  <path
    d="M7.94531 0.799805L0.799812 7.94531"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
  />
</svg>`;

export const IconCross2 = ({ className = "", size = null } = {}) => `
<svg ${getAttrs(
  className,
  size
)} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.707031 0.707031L21.707 21.707M21.707 0.707031L0.707031 21.707" stroke="currentColor" stroke-width="2" />
</svg>`;

export const IconArrowDown = ({ className = "", size = null } = {}) => `
  <svg ${getAttrs(
    className,
    size
  )} width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 2L5.35352 7L10.3535 2" stroke="black" />
  </svg>
`;

declare module 'vanta/dist/vanta.waves.min' {
  import type * as THREE from 'three';

  export interface VantaBaseOptions {
    el: HTMLElement | string;
    THREE?: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    color?: number;
  }

  export interface VantaEffectInstance {
    destroy: () => void;
    resize: () => void;
    setOptions?: (options: Record<string, unknown>) => void;
  }

  export interface VantaWavesOptions extends VantaBaseOptions {
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
  }

  const WAVES: (options: VantaWavesOptions) => VantaEffectInstance;
  export default WAVES;
}

declare module 'vanta/dist/vanta.net.min' {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from 'vanta/dist/vanta.waves.min';

  export interface VantaNetOptions extends VantaBaseOptions {
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  }

  const NET: (options: VantaNetOptions) => VantaEffectInstance;
  export default NET;
}

declare module 'vanta/dist/vanta.fog.min' {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from 'vanta/dist/vanta.waves.min';

  export interface VantaFogOptions extends VantaBaseOptions {
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    speed?: number;
    zoom?: number;
  }

  const FOG: (options: VantaFogOptions) => VantaEffectInstance;
  export default FOG;
}

declare module 'vanta/dist/vanta.dots.min' {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from 'vanta/dist/vanta.waves.min';

  export interface VantaDotsOptions extends VantaBaseOptions {
    color2?: number;
    size?: number;
    spacing?: number;
    showLines?: boolean;
  }

  const DOTS: (options: VantaDotsOptions) => VantaEffectInstance;
  export default DOTS;
}

declare module 'vanta/dist/vanta.halo.min' {
  import type {
    VantaBaseOptions,
    VantaEffectInstance,
  } from 'vanta/dist/vanta.waves.min';

  export interface VantaHaloOptions extends VantaBaseOptions {
    baseColor?: number;
    size?: number;
    amplitudeFactor?: number;
    xOffset?: number;
    yOffset?: number;
  }

  const HALO: (options: VantaHaloOptions) => VantaEffectInstance;
  export default HALO;
}

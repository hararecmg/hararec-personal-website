import { Orientation, Size, Color } from '../types/pexels';
import { Language } from '../types/language';

export interface PexelsRequest {
    query: string;
    orientation?: Orientation;
    size?: Size;
    color?: Color;
    locale?: Language;
    page?: number;
    per_page?: number;
}

export interface PexelsResponse {
    page: number;
    per_page: number;
    photos: Photo[];
    total_results: number;
    next_page?: string;
    prev_page?: string;
}

export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: Src;
    liked: boolean;
    alt: string;
}

export interface Src {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export interface ShortPexelsResponse {
    page: number;
    photos: ShortPhoto[];
}

export interface ShortPhoto {
    id: number;
    photographer: string;
    photographer_url: string;
    avg_color: string;
    src: Src;
    alt: string;
}
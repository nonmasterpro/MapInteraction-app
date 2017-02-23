import { Place } from './place';
export class Image { 
		constructor(
        public id: number,
        public fileName: string,
        public place_id: number,
        public created_at: string,
        public updated_at: string,
        public place?: Place
    ) {}
}
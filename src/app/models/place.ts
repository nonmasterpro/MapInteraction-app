import { Image } from './image';
export class Place {
	    constructor(
        public id: number,
        public name: string,
        public description: string,
        public contact: string,
        public type: string,
        public website: string,
        public x: number,
        public y: number,
        public images?: Image[]
    ) {}
}

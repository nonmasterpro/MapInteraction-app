export class Course {
    constructor(
        public courseName: string,
        public day: number,
        public start: string,
        public end: string,
        public userId: number,
        public placeId: number,
        public created_at: string,
        public updated_at: string
    ) {}
}
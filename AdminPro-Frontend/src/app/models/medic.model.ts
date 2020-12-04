import { Hospital } from './hospital.model';

// tslint:disable-next-line: class-name
interface _MedicUser {
    _id: string;
    name: string;
    lastName: string;
    img: string;
}

export class Medic {
    constructor(
        // tslint:disable-next-line: variable-name
        public name_medic: string,
        // tslint:disable-next-line: variable-name
        public area_medic?: string,
        public mid?: string,
        public img?: string,
        public user?: _MedicUser,
        public hospital?: Hospital
    ) {}
}

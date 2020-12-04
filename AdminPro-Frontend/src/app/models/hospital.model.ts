
// tslint:disable-next-line: class-name
interface _HospitalUser {
    _id: string;
    name: string;
    lastName: string;
    img: string;
}

export class Hospital {
    constructor(
        // tslint:disable-next-line: variable-name
        public name_hospital: string,
        public hid?: string,
        public img?: string,
        public user?: _HospitalUser,

    ) {}
}

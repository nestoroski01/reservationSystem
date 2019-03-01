import { User } from "src/app/user/shared/user.class";

export class Reservation {

    constructor(public seen: boolean,
                public eventId: string,
                public eventTitle: string,
                public eventHostId: string,
                public dateReserved: string,
                public guest: User
                ) {}
}
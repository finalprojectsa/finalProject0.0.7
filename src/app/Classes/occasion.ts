export class Occasion {

    constructor(public occasionCode:number,
                public inviterCode :number,
                public occasionDate:Date,
                public recordFile:string,
                public repetition:number,
                public firstMessage:Date,
                public range:number,
                public occasionTypeCode:number
            ) {
    }
}

export class Invites {
  
    constructor(public inviteeCode:Number,
                public occasionCode:Number,
                public portions:Number,
                public answerd:boolean,
                public reminderDay:Date,
                public tryCount:Number,
                public PersonCode:Number) {
                }
}

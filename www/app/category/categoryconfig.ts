export class CategoryConfig {

  public title: boolean = false ;
  public description: boolean = false ;
  public starttime: boolean = false ;
  public endtime: boolean = false ;
  public location: boolean = false ; // in case of non existing endlocation this is the valid one.
  public endlocation: boolean = false ;
  public member: boolean = false ;

  constructor(
    title: boolean,
    description: boolean,
    starttime: boolean,
    endtime: boolean,
    location: boolean,
    endlocation: boolean,
    member: boolean
  ) {
      this.title = title;
      this.description = description;
      this.starttime = starttime;
      this.endtime = endtime;
      if (endtime && !starttime) {
        console.log('ERROR! You can\'t set an endtime without having a starttime.');
      }
      this.location = location;
      this.endlocation = endlocation;
      if (endlocation && !location) {
        console.log('ERROR! You can\'t set an endlocation without having location set.' +
        ' If you just have one location, use location instead of endlocation.');
      }
      this.member = member;
  }
}

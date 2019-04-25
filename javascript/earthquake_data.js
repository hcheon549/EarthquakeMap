export default class EarthquakeData {
  constructor(year, month) {
    this.year = year
    this.month = month
  }

  getStartDate(){
    return this.year + "-" + this.month + "-01"
  }

  getEndDate() {
    let longerMonths = ["01", "03", "05", "07", "08", "10", "12"];
    let shorterMonths = ["04", "06", "09", "11"];
    if (longerMonths.includes(this.month)){
      return this.year + "-" + this.month + "-31";
    } else if (shorterMonths.includes(this.month)){
      return this.year + "-" + this.month + "-30";
    } else {
      return this.year + "-" + this.month + "-28";
    }
  }

  getStartYear(){
    return this.year + "-01-01"
  }

  getEndYear(){
    return this.year + "-12-31"
  }
}
class Clip {
  constructor ( args ) {
    {
      this.sourceURL = args.sourceURL;
      this.streamURL = args.streamURL;
      this.playerIN = args.playerIN;
      this.playerOUT = args.playerOUT;
      this.recorderIN = args.recorderIN;
      this.recorderOUT = args.recorderOUT;
      this.playTime = args.playerOUT - args.playerIN;
    }
  }
}

export default Clip;

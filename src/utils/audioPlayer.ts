class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  public init() {
    if (!this.audio) {
      this.audio = new Audio("/music/wedding-song.mp3");
      this.audio.loop = true;
      this.audio.volume = 0.6;

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
      });

      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
      });
    }
  }

  public async play() {
    this.init();

    if (!this.audio) return;

    try {
      await this.audio.play();
      this.isPlaying = true;
    } catch (error) {
      console.error("Unable to play wedding music:", error);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }

    void this.play();
    return true;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();

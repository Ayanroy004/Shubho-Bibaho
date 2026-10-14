class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentLanguage: "bn" | "en" = "bn";

  private getSongPath(language: "bn" | "en"): string {
    return language === "bn"
      ? "../../public/song/wedding-song.mp3"
      : "../../public/song/hindi-version-vaaroon.mp3";
  }

  public init(language: "bn" | "en" = this.currentLanguage) {
    this.currentLanguage = language;

    if (!this.audio) {
      this.audio = new Audio(this.getSongPath(language));
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

      this.audio.addEventListener("error", () => {
        this.isPlaying = false;
        console.error("Unable to load wedding music.");
      });
    } else if (
      this.audio.src !==
      new URL(this.getSongPath(language), window.location.origin).href
    ) {
      this.audio.src = this.getSongPath(language);
      this.audio.load();
    }
  }

  public async play(
    language: "bn" | "en" = this.currentLanguage,
  ): Promise<boolean> {
    this.init(language);

    if (!this.audio) {
      return false;
    }

    try {
      await this.audio.play();
      this.isPlaying = true;
      return true;
    } catch (error) {
      this.isPlaying = false;
      console.error("Unable to play wedding music:", error);
      return false;
    }
  }

  public stop() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  public async setLanguage(language: "bn" | "en") {
    const wasPlaying = this.isPlaying;
    this.currentLanguage = language;

    this.init(language);

    if (wasPlaying) {
      await this.play(language);
    }
  }

  public toggle(language: "bn" | "en" = this.currentLanguage): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }

    void this.play(language);
    return true;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();

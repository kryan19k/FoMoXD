import { FoMoXD } from "../typechain-types";

interface PlayerRounds {
  eth: number; // eth player has added to round (used for eth limiter)
  puffs: number; // puffs
  mask: number; // player mask (earn)
}

export default class SnapshotHepler {
  fomo: FoMoXD;
  constructor(fomoXD: FoMoXD) {
    this.fomo = fomoXD;
  }

  async getRoundSnapshot(roundId: number) {
    return {
      ...(await this.fomo.roundData_(roundId)),
    };
  }

  async getPlayerSnapshot(roundId: number, playerId: number) {
    return {
      player_: await this.fomo.player_(playerId),
      playerRoundsData_: await this.fomo.playerRoundsData_(playerId, roundId),
    };
  }

  async getConfigSnapshot() {
    return {
      roundID_: await this.fomo.roundID_(),
      activated_: await this.fomo.activated_(),
      roundInitTime_: await this.fomo.roundInitTime_(),
      roundIncTime_: await this.fomo.roundIncTime_(),
      roundGapTime_: await this.fomo.roundGapTime_(),
    };
  }
}

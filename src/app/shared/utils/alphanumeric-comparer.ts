export class AlphanumericComparer {
  /**
   * Compare 2 chunks (either strings or numbers) and return an integer
   * expressing how they should be sorted.
   * @param {(number|string)} chunkA - chunk a
   * @param {(number|string)} chunkB - chunk b
   */
  public static compareChunks(chunkA: number|string, chunkB: number|string): number {
    if (chunkA > chunkB || chunkB === undefined) {
      return 1;   // unsorted, swap them
    }
    if (chunkA < chunkB ||  chunkA === undefined) {
      return -1;  // sorted, do not do anything
    }

    // If chunks have different types, ensure the number type chunk goes first.
    const chunk1Type: string = typeof chunkA;
    const chunk2Type: string = typeof chunkB;
    if (chunk1Type !== chunk2Type) {
      return chunk1Type === 'number' ? -1 : 1;
    }

    return 0;
  }

  /** Split the text in numeric or text chunks.
   *
   * Chunks contain either numeric or non-numeric (text) characters,
   * but never both in the same chunk
   * @param {string} text - string to be split in chunks
   */
  public static splitInChunks(text: string): Array<number|string> {
    const regularExpression: RegExp = /(([0-9]+)|([^0-9]+))/g;
    const chunks: Array<number|string> = text
      .match(regularExpression)
      .map((chunk: string): number|string => {
        const numberChunk: number|string = Number(chunk);

        return Number.isNaN(numberChunk) ? chunk : numberChunk;
      });

    return chunks;
  }

  /**
   * Determine the order of 2 texts by an alphanumerical criteria.
   * @param {string} text1 - text to sort alphanumerically
   * @param {string} text2 - text to sort alphanumerically
   */
  public static sort(text1: string, text2: string): number {
    const chunks1: Array<number|string> = AlphanumericComparer.splitInChunks(text1);
    const chunks2: Array<number|string> = AlphanumericComparer.splitInChunks(text2);

    const longestListLength: number = Math.max(chunks1.length, chunks2.length);

    for (let i: number = 0; i < longestListLength; i++) {
      const chunkA: number|string = chunks1[i];
      const chunkB: number|string = chunks2[i];
      const comparisonResult: number = AlphanumericComparer.compareChunks(chunkA, chunkB);
      if (comparisonResult !== 0) {
        return comparisonResult;
      }
    }

    return 0;
  }
}

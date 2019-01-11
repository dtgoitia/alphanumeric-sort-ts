import { AlphanumericComparer } from './alphanumeric-comparer';

describe(AlphanumericComparer.name, (): void => {
  describe('compareChunks', (): void => {
    let chunkA: number|string;
    let chunkB: number|string;
    let output: number;

    it('should compare numbers', (): void => {
      chunkA = 100;
      chunkB = 200;
      output = -1;
      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);

      chunkA = 100;
      chunkB = 2;
      output = 1;
      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);

      chunkA = 50;
      chunkB = 50;
      output = 0;
      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);
    });

    it('should compare text', (): void => {
      chunkA = 'a';
      chunkB = 'd';
      output = -1;

      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);
      chunkA = 'd';
      chunkB = 'a';
      output = 1;

      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);
      chunkA = 'a';
      chunkB = 'a';
      output = 0;

      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);
      chunkA = 'ab';
      chunkB = 'ac';
      output = -1;

      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);
      chunkA = 'ac';
      chunkB = 'ab';
      output = 1;
      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);
    });

    it('should compare numbers and text', (): void => {
      chunkA = 'a';
      chunkB = 2;
      output = 1;
      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);

      chunkA = 2;
      chunkB = 'a';
      output = -1;
      expect(AlphanumericComparer.compareChunks(chunkA, chunkB)).toEqual(output);
    });
  });

  describe('sort', (): void => {
    const comparer: AlphanumericComparer = new AlphanumericComparer();

    it('should sort numbers', (): void => {
      const input: Array<number|string> = ['1', '100', '10', '2'];
      const out: Array<number|string> = ['1', '2', '10', '100'];
      input.sort(comparer.sort);
      expect(input).toEqual(out);
    });

    it('should sort alphanumericaly', (): void => {
      const input: Array<string> = [
        '1000X Radonius Maximus',
        '10X Radonius',
        '200X Radonius',
        '20X Radonius',
        '20X Radonius Prime',
        '30X Radonius',
        '40X Radonius',
        'Allegia 50 Clasteron',
        'Allegia 500 Clasteron',
        'Allegia 50B Clasteron',
        'Allegia 51 Clasteron',
        'Allegia 6R Clasteron',
        'Alpha 100',
        'Alpha 2',
        'Alpha 200',
        'Alpha 2A',
        'Alpha 2A-8000',
        'Alpha 2A-900',
        'Callisto Morphamax',
        'Callisto Morphamax 500',
        'Callisto Morphamax 5000',
        'Callisto Morphamax 600',
        'Callisto Morphamax 6000 SE',
        'Callisto Morphamax 6000 SE2',
        'Callisto Morphamax 700',
        'Callisto Morphamax 7000',
        'Xiph Xlater 10000',
        'Xiph Xlater 2000',
        'Xiph Xlater 300',
        'Xiph Xlater 40',
        'Xiph Xlater 5',
        'Xiph Xlater 50',
        'Xiph Xlater 500',
        'Xiph Xlater 5000',
        'Xiph Xlater 58'
      ];
      const out: Array<string> = [
        '10X Radonius',
        '20X Radonius',
        '20X Radonius Prime',
        '30X Radonius',
        '40X Radonius',
        '200X Radonius',
        '1000X Radonius Maximus',
        'Allegia 6R Clasteron',
        'Allegia 50 Clasteron',
        'Allegia 50B Clasteron',
        'Allegia 51 Clasteron',
        'Allegia 500 Clasteron',
        'Alpha 2',
        'Alpha 2A',
        'Alpha 2A-900',
        'Alpha 2A-8000',
        'Alpha 100',
        'Alpha 200',
        'Callisto Morphamax',
        'Callisto Morphamax 500',
        'Callisto Morphamax 600',
        'Callisto Morphamax 700',
        'Callisto Morphamax 5000',
        'Callisto Morphamax 6000 SE',
        'Callisto Morphamax 6000 SE2',
        'Callisto Morphamax 7000',
        'Xiph Xlater 5',
        'Xiph Xlater 40',
        'Xiph Xlater 50',
        'Xiph Xlater 58',
        'Xiph Xlater 300',
        'Xiph Xlater 500',
        'Xiph Xlater 2000',
        'Xiph Xlater 5000',
        'Xiph Xlater 10000'
      ];
      input.sort(comparer.sort);
      expect(input).toEqual(out);
    });
  });

  describe('splitInChunks', (): void => {
    let input: string;
    let output: Array<string|number>;

    it('should split numbers', (): void => {
      input = '123456';
      output = [123456];
      expect(AlphanumericComparer.splitInChunks(input)).toEqual(output);
    });
    it('should split text', (): void => {
      input = 'abcd';
      output = ['abcd'];
      expect(AlphanumericComparer.splitInChunks(input)).toEqual(output);
    });
    it('should split numbers and text', (): void => {
      input = 'abcd1234abcd1234';
      output = ['abcd', 1234, 'abcd', 1234];
      expect(AlphanumericComparer.splitInChunks(input)).toEqual(output);
    });
    it('should split numbers and text with special characters', (): void => {
      input = 'ab?cd12_34abcd-1234';
      output = ['ab?cd', 12, '_', 34, 'abcd-', 1234];
      expect(AlphanumericComparer.splitInChunks(input)).toEqual(output);
    });
  });
});

export interface NoteDialogue {
  content: string,
  divingCount: number,
  totalDivedCount: number
}

interface ResultContentType {
  type: "text",
  text: string,
}

interface ResultType {
  content: Array<ResultContentType>
}

export class Dialogue {
  constructor() {}

  public diveInWhy(input: NoteDialogue): ResultType  {
    const { content, divingCount, totalDivedCount } = input

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          content: content,
          divingCount: divingCount,
          totalDivedCount: totalDivedCount,
        }, null, 2)
      }]
    }
  }
}
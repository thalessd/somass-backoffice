export default class TextTruncate {
  static truncate(text: string, length?: number, ending?: string) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = "...";
    }
    if (text.length > length) {
      return text.substring(0, length - ending.length).trim() + ending;
    } else {
      return text;
    }
  }
}

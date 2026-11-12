// Reads the text on pictures with macOS's built-in text recognition.
// Usage: ocr <image>...   Prints one JSON object per image: {"file": "...", "lines": ["..."]}
import Foundation
import ImageIO
import Vision

for path in CommandLine.arguments.dropFirst() {
  guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: path) as CFURL, nil),
    let cg = CGImageSourceCreateImageAtIndex(src, 0, nil)
  else { continue }
  let req = VNRecognizeTextRequest()
  req.recognitionLevel = .accurate
  req.usesLanguageCorrection = false
  try? VNImageRequestHandler(cgImage: cg).perform([req])
  let lines = (req.results ?? []).compactMap { $0.topCandidates(1).first?.string }
  let obj: [String: Any] = ["file": path, "lines": lines]
  if let data = try? JSONSerialization.data(withJSONObject: obj),
    let s = String(data: data, encoding: .utf8)
  {
    print(s)
  }
}

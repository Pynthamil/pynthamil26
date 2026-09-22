import Vision
import CoreImage
import Foundation

let args = CommandLine.arguments
if args.count < 2 { exit(1) }
let path = args[1]
let url = URL(fileURLWithPath: path)
guard let ciImage = CIImage(contentsOf: url) else { exit(1) }

let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
let request = VNRecognizeTextRequest { request, error in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    let text = observations.compactMap { $0.topCandidates(1).first?.string }.joined(separator: " ")
    print(text)
}
try? handler.perform([request])

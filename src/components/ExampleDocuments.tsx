import React from 'react';
import { BookOpen, Lightbulb } from 'lucide-react';

interface ExampleDocumentsProps {
  onLoadExample: (doc1: string, doc2: string) => void;
}

const examples = [
  {
    title: "Technology Articles",
    description: "Similar articles about artificial intelligence",
    doc1: `Artificial intelligence is revolutionizing the way we work and live. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions. Deep learning, a subset of machine learning, uses neural networks to simulate human brain function. These technologies are being applied in healthcare, finance, transportation, and many other industries. AI systems can automate repetitive tasks, enhance decision-making, and create new opportunities for innovation.`,
    doc2: `The field of artificial intelligence has made tremendous progress in recent years. Advanced machine learning techniques enable computers to learn from data without explicit programming. Neural networks, particularly deep learning models, have achieved remarkable success in image recognition, natural language processing, and game playing. AI applications are transforming industries such as medicine, banking, and autonomous vehicles. These intelligent systems help automate processes, improve accuracy, and drive technological advancement.`
  },
  {
    title: "Different Topics",
    description: "Completely unrelated content",
    doc1: `The art of cooking involves combining ingredients, techniques, and creativity to create delicious meals. Professional chefs spend years mastering knife skills, understanding flavor profiles, and learning various cooking methods. From French cuisine to Asian fusion, culinary traditions vary greatly across cultures. Modern cooking also embraces molecular gastronomy and farm-to-table movements.`,
    doc2: `Space exploration has captivated humanity for decades. Astronauts train extensively to prepare for missions beyond Earth's atmosphere. Rockets must overcome gravitational forces to reach orbit. The International Space Station serves as a laboratory for scientific research in microgravity. Future missions aim to establish permanent settlements on Mars and explore distant planets.`
  },
  {
    title: "Identical Content",
    description: "Exactly the same text",
    doc1: `Climate change represents one of the most pressing challenges of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and weather patterns to become more extreme. Scientists worldwide are studying these phenomena and developing solutions to reduce greenhouse gas emissions.`,
    doc2: `Climate change represents one of the most pressing challenges of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and weather patterns to become more extreme. Scientists worldwide are studying these phenomena and developing solutions to reduce greenhouse gas emissions.`
  }
];

export function ExampleDocuments({ onLoadExample }: ExampleDocumentsProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <h3 className="font-semibold text-gray-800">Try These Examples</h3>
      </div>
      
      <div className="grid gap-3">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onLoadExample(example.doc1, example.doc2)}
            className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-blue-600 mt-1 group-hover:text-blue-700" />
              <div>
                <h4 className="font-medium text-gray-800 group-hover:text-blue-800">
                  {example.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {example.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
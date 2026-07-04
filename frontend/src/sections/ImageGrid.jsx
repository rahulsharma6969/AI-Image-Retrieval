import React from "react";

const images = [
  {
    src: "https://images.pexels.com/photos/30683516/pexels-photo-30683516/free-photo-of-pensive-young-woman-in-abstract-portrait.jpeg",
    description: "A young woman gazes into the distance with a contemplative expression, her face softly illuminated. The abstract composition and artistic blur create a dreamlike, introspective atmosphere, evoking a sense of mystery."
  },
  {
    src: "https://images.pexels.com/photos/30140435/pexels-photo-30140435/free-photo-of-moody-forest-in-heavy-fog.jpeg",
    description: "A dense forest is enveloped in thick fog, softening the outlines of towering trees. The mist creates an eerie, tranquil ambiance, evoking mystery and solitude as the landscape fades into the haze."
  },
  {
    src: "https://images.pexels.com/photos/30688446/pexels-photo-30688446/free-photo-of-misty-mountain-peak-in-the-swiss-alps.jpeg",
    description: "A majestic mountain peak emerges through swirling mist, its rugged slopes partially obscured by drifting clouds. The snow-capped summit contrasts beautifully against the foggy backdrop, creating a breathtaking alpine scene."
  },
  {
    src: "https://images.pexels.com/photos/30494421/pexels-photo-30494421/free-photo-of-delicious-croissant-with-fresh-berries-and-cream-topping.jpeg",
    description: "A golden, flaky croissant sits atop a plate, adorned with fresh, juicy berries and a dollop of cream. The rich colors and delicate textures make this pastry an irresistible and visually stunning treat."
  },
  {
    src: "https://images.pexels.com/photos/4887831/pexels-photo-4887831.jpeg",
    description: "The calm waters of a lake reflect the warm hues of a setting sun, creating a serene, picturesque scene. Gentle ripples shimmer under the golden light, while distant mountains add a sense of depth and tranquility."
  },
  {
    src: "https://images.pexels.com/photos/30683516/pexels-photo-30683516/free-photo-of-pensive-young-woman-in-abstract-portrait.jpeg",
    description: "A young woman gazes into the distance with a contemplative expression, her face softly illuminated. The abstract composition and artistic blur create a dreamlike, introspective atmosphere, evoking a sense of mystery."
  },
  {
    src: "https://images.pexels.com/photos/30140435/pexels-photo-30140435/free-photo-of-moody-forest-in-heavy-fog.jpeg",
    description: "A dense forest is enveloped in thick fog, softening the outlines of towering trees. The mist creates an eerie, tranquil ambiance, evoking mystery and solitude as the landscape fades into the haze."
  },
  {
    src: "https://images.pexels.com/photos/30688446/pexels-photo-30688446/free-photo-of-misty-mountain-peak-in-the-swiss-alps.jpeg",
    description: "A majestic mountain peak emerges through swirling mist, its rugged slopes partially obscured by drifting clouds. The snow-capped summit contrasts beautifully against the foggy backdrop, creating a breathtaking alpine scene."
  },
  {
    src: "https://images.pexels.com/photos/30494421/pexels-photo-30494421/free-photo-of-delicious-croissant-with-fresh-berries-and-cream-topping.jpeg",
    description: "A golden, flaky croissant sits atop a plate, adorned with fresh, juicy berries and a dollop of cream. The rich colors and delicate textures make this pastry an irresistible and visually stunning treat."
  },
  {
    src: "https://images.pexels.com/photos/4887831/pexels-photo-4887831.jpeg",
    description: "The calm waters of a lake reflect the warm hues of a setting sun, creating a serene, picturesque scene. Gentle ripples shimmer under the golden light, while distant mountains add a sense of depth and tranquility."
  }
];

const ImageGrid = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 py-4 md:py-8 gap-4 px-4">
      {images.map((image, index) => (
        <div key={index} className="relative mb-4 break-inside-avoid group">
          <img
            src={image.src}
            className="w-full object-cover rounded-lg transition-all duration-300 group-hover:blur-md"
            alt={image.description}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
            <p className="text-white text-lg font-semibold text-center px-4">{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;

export const getColorPsychology = (hex) => {
  // Convert hex to RGB for analysis
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate HSL for better color categorization
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  
  let s = 0;
  if (max !== min) {
    s = l > 0.5 
      ? (max - min) / (2 - max - min) 
      : (max - min) / (max + min);
  }
  
  let h = 0;
  if (max !== min) {
    const delta = max - min;
    if (max === r / 255) {
      h = ((g / 255 - b / 255) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g / 255) {
      h = ((b / 255 - r / 255) / delta + 2) / 6;
    } else {
      h = ((r / 255 - g / 255) / delta + 4) / 6;
    }
  }
  h = Math.round(h * 360);

  const lightness = l * 100;
  const saturation = s * 100;

  // Determine mood based on color properties
  let mood = '';
  let description = '';
  let emotions = [];

  // CHECK FOR GRAYSCALE FIRST (more strict threshold)
  if (saturation < 15) {
    if (lightness > 80) {
      mood = 'Pure & Clean';
      description = 'This color represents purity, simplicity, and new beginnings. Creates a sense of spaciousness and clarity, often used for minimalist aesthetics and fresh starts.';
      emotions = ['Pure', 'Clean', 'Simple', 'Fresh'];
    } else if (lightness < 20) {
      mood = 'Dramatic & Powerful';
      description = 'A bold choice that conveys power, sophistication, and mystery. Creates strong contrast and draws attention to important elements in visual storytelling.';
      emotions = ['Dramatic', 'Powerful', 'Sophisticated', 'Intense'];
    } else {
      mood = 'Neutral & Balanced';
      description = 'This neutral tone provides balance and versatility. Perfect for creating harmony without overwhelming other elements, commonly used in professional and urban settings.';
      emotions = ['Neutral', 'Balanced', 'Professional', 'Calm'];
    }
    return {
      mood,
      description,
      emotions,
      usage: 'Clean backgrounds, minimalist aesthetics, neutral settings'
    };
  }

  // NOW analyze colored pixels
  // Red spectrum (0-30, 330-360)
  if ((h >= 0 && h < 30) || h >= 330) {
    if (saturation > 40 && lightness < 70) {
      mood = 'Passionate & Energetic';
      description = 'This warm, vibrant tone evokes strong emotions and commands attention. It represents intensity, determination, and raw energy - perfect for conveying power and excitement in dynamic scenes.';
      emotions = ['Passionate', 'Energetic', 'Bold', 'Intense'];
    } else {
      mood = 'Soft & Romantic';
      description = 'A gentle, soothing tone that evokes tenderness and warmth. It creates an approachable, youthful atmosphere ideal for heartwarming and emotional moments.';
      emotions = ['Romantic', 'Gentle', 'Youthful', 'Sweet'];
    }
  }
  // Orange spectrum (30-60)
  else if (h >= 30 && h < 60) {
    mood = 'Warm & Cheerful';
    description = 'This energizing tone radiates enthusiasm and creativity. It combines warmth with vibrancy, creating an uplifting atmosphere that feels both inviting and dynamic.';
    emotions = ['Cheerful', 'Enthusiastic', 'Creative', 'Warm'];
  }
  // Yellow spectrum (60-90)
  else if (h >= 60 && h < 90) {
    if (lightness > 70) {
      mood = 'Bright & Optimistic';
      description = 'A luminous, cheerful tone that symbolizes hope and positivity. It catches the eye and lifts spirits, perfect for comedic or lighthearted moments that radiate joy.';
      emotions = ['Happy', 'Optimistic', 'Playful', 'Energetic'];
    } else {
      mood = 'Rich & Vibrant';
      description = 'A deep, luxurious tone that suggests wealth and wisdom. This color commands respect while maintaining warmth, often associated with prestige and magical elements.';
      emotions = ['Prestigious', 'Wise', 'Valuable', 'Radiant'];
    }
  }
  // Green spectrum (90-150)
  else if (h >= 90 && h < 150) {
    if (saturation > 40) {
      mood = 'Fresh & Natural';
      description = 'A lively, organic tone that embodies growth and vitality. It brings a sense of renewal and life force, creating connections to nature and healing energy.';
      emotions = ['Natural', 'Fresh', 'Growing', 'Healing'];
    } else {
      mood = 'Calm & Balanced';
      description = 'A serene, harmonious tone that promotes tranquility. It creates a peaceful atmosphere perfect for moments of reflection and emotional balance.';
      emotions = ['Peaceful', 'Balanced', 'Serene', 'Harmonious'];
    }
  }
  // Cyan/Teal spectrum (150-210)
  else if (h >= 150 && h < 210) {
    if (lightness > 70) {
      mood = 'Light & Refreshing';
      description = 'An airy, crisp tone that evokes clarity and freshness. It feels light and open, like a clear sky or pristine water, bringing a sense of calm energy and new possibilities.';
      emotions = ['Fresh', 'Clear', 'Serene', 'Airy'];
    } else {
      mood = 'Cool & Dynamic';
      description = 'A modern, energetic tone that suggests innovation and forward thinking. It combines coolness with vibrancy, ideal for conveying technology, communication, and contemporary themes.';
      emotions = ['Dynamic', 'Modern', 'Innovative', 'Energetic'];
    }
  }
  // Blue spectrum (210-270)
  else if (h >= 210 && h < 270) {
    if (lightness < 40) {
      mood = 'Deep & Mysterious';
      description = 'A profound, contemplative tone that suggests depth and introspection. It creates an atmosphere of mystery and seriousness, perfect for dramatic and emotional storytelling.';
      emotions = ['Mysterious', 'Deep', 'Introspective', 'Serious'];
    } else if (lightness > 70) {
      mood = 'Calm & Peaceful';
      description = 'A soft, tranquil tone that promotes serenity and trust. It feels gentle and reassuring, like an open sky, creating a sense of peace and emotional safety.';
      emotions = ['Calm', 'Peaceful', 'Trustworthy', 'Gentle'];
    } else {
      mood = 'Confident & Stable';
      description = 'A solid, dependable tone that conveys strength and reliability. It inspires confidence and composure, representing stability and unwavering determination.';
      emotions = ['Confident', 'Stable', 'Reliable', 'Strong'];
    }
  }
  // Purple/Magenta spectrum (270-330)
  else if (h >= 270 && h < 330) {
    if (h >= 300 && lightness > 60) {
      mood = 'Playful & Sweet';
      description = 'A vibrant, joyful tone that radiates fun and affection. It combines energy with charm, creating a delightful atmosphere that feels both exciting and endearing.';
      emotions = ['Playful', 'Sweet', 'Joyful', 'Cute'];
    } else if (saturation > 50) {
      mood = 'Magical & Creative';
      description = 'An enchanting, imaginative tone that suggests mystery and luxury. It inspires creativity and wonder, perfect for conveying mystical powers and extraordinary experiences.';
      emotions = ['Magical', 'Creative', 'Luxurious', 'Mystical'];
    } else {
      mood = 'Spiritual & Dreamy';
      description = 'A soft, ethereal tone that evokes imagination and transcendence. It creates a dreamlike quality, suggesting deeper meaning and spiritual connection beyond the physical world.';
      emotions = ['Spiritual', 'Dreamy', 'Imaginative', 'Ethereal'];
    }
  }

  return {
    mood,
    description,
    emotions,
    usage: getAnimeUsage(h, saturation, lightness)
  };
};

const getAnimeUsage = (h, s, l) => {
  // Determine common anime usage based on color
  if ((h >= 0 && h < 30) || h >= 330) {
    return s > 40 ? 'Action scenes, powerful characters, dramatic moments' : 'Romance, cute characters, emotional scenes';
  } else if (h >= 30 && h < 90) {
    return 'Cheerful moments, sunrise/sunset scenes, warm atmospheres';
  } else if (h >= 90 && h < 150) {
    return 'Nature scenes, healing moments, peaceful environments';
  } else if (h >= 150 && h < 210) {
    return 'Water scenes, technology, modern settings, sky imagery';
  } else if (h >= 210 && h < 270) {
    return 'Sky scenes, melancholic moments, serious tones';
  } else if (h >= 270 && h < 330) {
    return 'Magic, fantasy, mystical characters, cute aesthetics';
  }
  
  return 'Various anime contexts';
};
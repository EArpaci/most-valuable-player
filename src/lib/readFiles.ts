import { calculateMVP, getMVP } from './mvp';

export async function readFiles(files) {
  if (!files.length) {
    return;
  }

  files = [...files];

  const data = [];

  files.forEach((file) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const { result } = reader;
      const splitText = String(result).split('\n');
      const title = splitText[0];

      const calculate = await calculateMVP(title, splitText.slice(1));
      const mvp = await getMVP();

      data.push({
        ...calculate,
      });

      localStorage.setItem('sports', JSON.stringify(data));
      localStorage.setItem('mvp', JSON.stringify(mvp));
    };

    reader.readAsText(file);
  });

  return true;
}

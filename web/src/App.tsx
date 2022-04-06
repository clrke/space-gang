import React, { useEffect } from 'react';
import './App.css';
import SpaceSuitA from './suits/space-suit-a.png';
import SpaceSuitB from './suits/space-suit-b.png';

const TOKEN_BASE_URI = 'https://shinji.xyz/api/unit-00/nft/';
const DEFAULT_IMAGE = 'https://static.shinji.xyz/unit-00/nft-images/a857674791fb05b1444e3647c6cd4d75760bfe63c2253d4b7c76fe2d430714e0.png';

const SPACE_CLOTHES = [
  'Space Suit A',
  'Space Suit B',
]

interface NftAttribute {
  trait_type: string;
  value: string;
}

interface Nft {
  image: string;
  attributes: NftAttribute[];
}

function App() {
  const [sjId, setSjId] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [clothes, setClothes] = React.useState<string | null>(null);

  const imageComponent = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sjId) return;

    (async () => {
      const response = await fetch(`${TOKEN_BASE_URI}${sjId}`);
      if (!response.ok) {
        setImageUrl(null);
        setClothes(null);
        return;
      }

      const nft: Nft = await response.json();

      setImageUrl(nft.image);
      setClothes(nft.attributes.find(a => a.trait_type === 'Clothes')!.value);

      /*
      const imgObj = new Image();
      imgObj.src = nft.image + '?' + new Date().getTime();
      imgObj.setAttribute('crossOrigin', '');

      const canvas = document.createElement('canvas');
      canvas.width = imgObj.width;
      canvas.height = imgObj.height;

      const context2d = canvas.getContext('2d')!;
      context2d.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
      const pixelData = context2d.getImageData(0, imgObj.height-1, 1, 1).data;
      console.log(pixelData);
      */
    })();
  }, [sjId]);

  return (
    <div className="App">
      <header className="App-header">
        *BETA* What's your Shonen Junk ID?
        <input type="text" value={sjId} onChange={e => setSjId(e.target.value)} placeholder={"Example: 4647"} />
      </header>

      <section className={"content"}>
        {clothes && !SPACE_CLOTHES.includes(clothes) && (
          <h1>Looks like you don't have a space suit. That's okay, you can borrow one.</h1>
        )}
        <img src={imageUrl || DEFAULT_IMAGE} alt="Shonen Junk" width={400} ref={imageComponent} />
        {clothes && (
          clothes === SPACE_CLOTHES[0] ? (
            <img className={"space-suit space-suit-a"} src={SpaceSuitA} alt="Space Suit B" width={330} />
          ) : (
            <img className={"space-suit space-suit-b"} src={SpaceSuitB} alt="Space Suit B" width={330} />
          )
        )}
      </section>
    </div>
  );
}

export default App;

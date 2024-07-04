export function loadTgos() {
  const existingScript = document.getElementById('tgos-script');

  return new Promise((res, rej) => {
    if (!existingScript) {
      const script = document.createElement('script');
      script.src =
        'https://api.tgos.tw/TGOS_API/tgos?ver=2&AppID=x+JLVSx85Lk=&APIKey=in8W74q0ogpcfW/STwicK8D5QwCdddJf05/7nb+OtDh8R99YN3T0LurV4xato3TpL/fOfylvJ9Wv/khZEsXEWxsBmg+GEj4AuokiNXCh14Rei21U5GtJpIkO++Mq3AguFK/ISDEWn4hMzqgrkxNe1Q==';
      script.id = 'tgos-script';
      document.body.appendChild(script);
      script.onload = res;
    } else {
      res();
    }
  });
}

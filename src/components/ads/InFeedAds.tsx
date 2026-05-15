"use client";

import React from 'react';

export const HorizontalAd = () => {
  const adKey = 'a85949e71198684afe139f5f7c13701d';
  
  return (
    <div className="col-span-full w-full py-4 flex justify-center">
      <div className="w-full max-w-[728px] min-h-[90px] bg-white/5 border border-white/10 rounded-xl overflow-hidden relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
        <iframe
          title="ad-horizontal"
          srcDoc={`
            <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;">
              <script type="text/javascript">
                atOptions = {
                  'key' : '${adKey}',
                  'format' : 'iframe',
                  'height' : 90,
                  'width' : 728,
                  'params' : {}
                };
                document.write('<script type="text/javascript" src="//www.highperformanceformat.com/${adKey}/invoke.js"><\\/script>');
              </script>
            </body>
          `}
          width="728"
          height="90"
          frameBorder="0"
          scrolling="no"
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export const VerticalAd = ({ side }: { side: 'left' | 'right' }) => {
  const adKey = side === 'left' ? '0a59a5423417ba377ceb1e52a0c7ee66' : '5343a12d3ecc492da6919a8eaccacfdf';

  return (
    <div 
      className={`hidden xl:flex fixed top-48 ${side === 'left' ? 'left-4' : 'right-4'} w-[160px] h-[600px] bg-white/5 border border-white/10 rounded-xl flex-col items-center justify-center overflow-hidden z-40 shadow-2xl shadow-black`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-neon-violet/5 opacity-50 pointer-events-none" />
      <iframe
        title={`ad-vertical-${side}`}
        srcDoc={`
          <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;">
            <script type="text/javascript">
              atOptions = {
                'key' : '${adKey}',
                'format' : 'iframe',
                'height' : 600,
                'width' : 160,
                'params' : {}
              };
              document.write('<script type="text/javascript" src="//www.highperformanceformat.com/${adKey}/invoke.js"><\\/script>');
            </script>
          </body>
        `}
        width="160"
        height="600"
        frameBorder="0"
        scrolling="no"
        className="relative z-10"
      />
    </div>
  );
};

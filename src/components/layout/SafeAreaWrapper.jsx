import React from 'react';

export default function SafeAreaWrapper({ children }) {
  return (
    <main className="flex-1 overflow-y-auto w-full max-w-[430px] mx-auto pb-[100px]">
      {children}
    </main>
  );
}

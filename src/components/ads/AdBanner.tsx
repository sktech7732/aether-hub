"use client";

import React from 'react';
import { PROP_AD_SCRIPT_URL } from '@/config/ads';

const AdBanner = () => {
  return (
    <div className="flex justify-center my-4">
      <script async src={PROP_AD_SCRIPT_URL}></script>
    </div>
  );
};

export default AdBanner;

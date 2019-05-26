import React from 'react';

export default {
  doLogin(backUrl) {
    window.location.href = `/login?redirect=${encodeURIComponent(backUrl)}`;
  },
};

const useDeviceWidth = () => {
  const deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;

  return {
    xs: deviceWidth <= 360,
    smMax: deviceWidth < 768,
    mdMax: deviceWidth < 1024,
    lg: deviceWidth >= 1024,
  };
};

export default useDeviceWidth;

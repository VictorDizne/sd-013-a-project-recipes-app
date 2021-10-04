// import React from 'react';
// import PropTypes from 'prop-types';
// import RecomendationCard from './RecomendationCard';

// const SEIS = 6;

// const RecomendationMap = ({ itens, pathname, isMeal }) => {
//   console.log('MAP', itens, pathname);

//   return (
//     // <HorizontalGallery
//     //   tiles={ itens.map((item, index) => (
//     //     index < SEIS
//     //       && <div
//     //         style={ { display: 'flex',
//     //           justifyContent: 'center',
//     //           alignItems: 'center',
//     //           width: 250,
//     //           height: 270,
//     //           backgroundColor: '#D0D0D0',
//     //           borderRadius: 10,
//     //         } }
//     //       >
//     itens.map((item, index) => (
//       index < SEIS
//       && <RecomendationCard
//         item={ item }
//         index={ index }
//         pathname={ pathname }
//         isMeal={ isMeal }
//       />))
//     //     </div>
//     // )) }
//     // elementWidth={ 300 }
//     // galleryPosition={ 6 }
//     // galleryWidth={ 500 }
//     // elementsShown={ 2 }
//     // fadeDistance={ 650 }
//     // minPadding={ 20 }
//     // style={ { width: 600 } }
//   // />
//   );
// };

// RecomendationMap.propTypes = {
//   itens: PropTypes.shape({}),
//   pathname: PropTypes.string,
//   isMeal: PropTypes.bool,
//   map: PropTypes.func,
// }.isRequired;

// export default RecomendationMap;

// import {
//     alignmentSeq,
//     alignmentSeqElem,
// } from '../alignmentTypes';

// export const getEditGroups = <T>(alignment:alignmentSeq<T>)
//                                 : alignmentSeq<T>[] => {
//     const results:alignmentSeq<T>[] = new Array();
//     let currGroup:alignmentSeq<T> = new Array();
//     let isEditGroup:boolean = undefined;

//     for (let i = 0; i < alignment.length; i++) {
//         const currTuple:alignmentSeqElem<T> = alignment[i];
//         const isEditTuple:boolean = editFlags[i];
//         if (isEditGroup === undefined) { isEditGroup = isEditTuple; }

//         if (isEditTuple === isEditGroup) {
//             currGroup.push(currTuple);
//         } else {
//             results.push(currGroup);
//             currGroup = new Array(...[currTuple]);
//             isEditGroup = isEditTuple;
//         }
//     }

//     if (currGroup.length > 0) { results.push(currGroup); }
//     return results;
// };

// Export 2 đối tượng
// Case 1:
// exports.area = (x, y) => x * y;
// exports.perimeter = (x, y) => 2 * (x + y);

// Case 2:
// function area(x, y){
//     return x * y;
// }

// function perimeter(x, y){
//     return 2 * (x + y);
// }

// module.exports = {area, perimeter};

/** ------ Asynchronous methods ----- */
// Method 1: Using callback
// const CalcRectangle = (x, y, callback) => {
//     if(x <= 0 || y <= 0){
//         setTimeout(() => callback(new Error("Lỗi: Hai cạnh của HCN phải > 0"), null), 2000);
//     }else{
//         setTimeout(() => callback(null, {
//             area: () => x * y,
//             perimeter: () => 2 * (x + y)
//         }), 2000);
//     }
// }
// module.exports = CalcRectangle; // Default module

// Method 2: Using Promise
// const CalcRectanglePromise = (x ,y) => {
//     return new Promise((solve, reject) => {
//         if(x <=0 || y <= 0)
//             reject("Lỗi: Hai cạnh của HCN phải > 0");
//         else
//             solve({area: x*y, perimeter: 2 * (x+y)})
//     });
// };

// module.exports = CalcRectanglePromise; // Default module

// Method 3: Using async/ await
const CalcRectangleAsync = async (x, y) => {
    if(x <= 0 || y <= 0)
        throw new Error("Hai cạnh của HCN phải > 0");
    else
        return {area: x * y, perimeter: 2 * (x + y)};
}

module.exports = CalcRectangleAsync;
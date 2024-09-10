// const rect = {
//     area: (x, y) => x * y,
//     perimeter: (x, y) => 2 * (x + y)
// };

// Sử dụng module "rectangle"
const rect = require("./rectangle");

// function CalcRectangle(l, w){
//     if (l <= 0 || w <= 0) {
//         console.log("Lỗi: Hai cạnh của HCN phải > 0");
//     }else{
//         console.log(`Diện tích HCN = ${rect.area(l, w)}`);
//         console.log(`Chu vi HCN = ${rect.perimeter(l, w)}`);
//     }
// }

// function CalcRectangle(l, w){
//     rect(l, w, (err, result) => {
//         if(err)
//             console.log(err.message);
//         else{
//             console.log(`Diện tích = ${result.area()}`);
//             console.log(`Chu vi = ${result.perimeter()}`);
//         }
//     });
// }

// // Execution
// CalcRectangle(20, 10);
// CalcRectangle(-20, 5);
// CalcRectangle(10, 3);

// Test Promise
rect(-20, 10)
    .then(({area, perimeter}) => {
        console.log(`Diện tích = ${area}`);
        console.log(`Chu vi = ${perimeter}`);
    })
    .catch(err => console.log(err));
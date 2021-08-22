function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.replace(/\s+/g, "");
        let opsRe = /\+|\*|\/|-/;
        let subExpr = "";
        let subRes = "";
        let closeBracketInd = 0;
        let f = {
          add: "+",
          sub: "-",
          div: "/",
          mlt: "*",
        };

        // Create array for Order of Operation and precedence
        f.ooo = [
          [[f.mlt], [f.div]],
          [[f.add], [f.sub]],
        ];

        let output;
        while (opsRe.test(expr)) {
          if (expr.includes("(") || expr.includes(")")) {
            if (
              expr.match(/\(/g) &&
              expr.match(/\)/g) &&
              expr.match(/\(/g).length === expr.match(/\)/g).length
            ) {
              closeBracketInd = expr.indexOf(")", expr.lastIndexOf("(") + 1);
              subExpr = expr.slice(expr.lastIndexOf("("), closeBracketInd + 1);
              subRes = test(subExpr);
              expr = expr.replace(subExpr, subRes);
            } else {
              throw new Error("ExpressionError: Brackets must be paired");
            }
          } else {
            expr = test(expr);
          }
          if (expr < 0) {
            break;
          }
        }
        return expr;

        function test(str) {
          if (str.includes("(")) {
            str = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
          }
          for (let i = 0, n = f.ooo.length; i < n; i++) {
            // Regular Expression to look for operators between floating numbers or integers
            if (str.match(/\d{1,}\-\d{1,}/) && !str.match(/^\-/)) {
              re = new RegExp(
                "(\\d+\\.?\\d*)([\\" +
                  f.ooo[i].join("\\") +
                  "])(\\-?\\d+\\.?\\d*)"
              );
            } else {
              re = new RegExp(
                "(\\-?\\d+\\.?\\d*)([\\" +
                  f.ooo[i].join("\\") +
                  "])(\\-?\\d+\\.?\\d*)"
              );
            }
            re.lastIndex = 0; // take precautions and reset re starting pos

            // Loop while there is still calculation for level of precedence
            while (re.test(str)) {
              output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
              if (isNaN(output) || !isFinite(output)) return output; // exit early if not a number
              str = str.replace(re, output);
              if (str.match(/\d{1,}\-\d{1,}/) && !str.match(/^\-/)) {
                re = new RegExp(
                  "(\\d+\\.?\\d*)([\\" +
                    f.ooo[i].join("\\") +
                    "])(\\-?\\d+\\.?\\d*)"
                );
              } else {
                re = new RegExp(
                  "(\\-?\\d+\\.?\\d*)([\\" +
                    f.ooo[i].join("\\") +
                    "])(\\-?\\d+\\.?\\d*)"
                );
              }
            }
          }
          return output;
        }

        function _calculate(a, op, b) {
          a = a * 1;
          b = b * 1;
          switch (op) {
            case f.add:
              return a + b;
              break;
            case f.sub:
              return a - b;
              break;
            case f.div:
              if (b === 0) {
                throw new TypeError("TypeError: Division by zero.");
              }
              return a / b;
              break;
            case f.mlt:
              return a * b;
              break;
            default:
              null;
          }
        }
}

module.exports = {
    expressionCalculator
}
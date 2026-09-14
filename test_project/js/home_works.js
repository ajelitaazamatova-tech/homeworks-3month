//gmail checker
const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton?.addEventListener("click", () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK";
        gmailResult.style.color = "green";
    } else {
        gmailResult.innerHTML = "NOT OK";
        gmailResult.style.color = "red";
    }
});

//move block
const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

if (childBlock && parentBlock) {
    let positionX = 0;
    let positionY = 0;

    const offsetWidth = parentBlock.clientWidth - childBlock.offsetWidth;
    const offsetHeight = parentBlock.clientHeight - childBlock.offsetHeight;

    const moveBlock = () => {
        // вправо
        if (positionX < offsetWidth && positionY === 0) {
            positionX++;
            childBlock.style.left = `${positionX}px`;
            requestAnimationFrame(moveBlock);
        } 
        // вниз
        else if (positionX >= offsetWidth && positionY < offsetHeight) {
            positionY++;
            childBlock.style.top = `${positionY}px`;
            requestAnimationFrame(moveBlock);
        } 
        // влево
        else if (positionX > 0 && positionY >= offsetHeight) {
            positionX--;
            childBlock.style.left = `${positionX}px`;
            requestAnimationFrame(moveBlock);
        } 
        // вверх
        else if (positionX === 0 && positionY > 0) {
            positionY--;
            childBlock.style.top = `${positionY}px`;
            requestAnimationFrame(moveBlock);
        }
    };
    moveBlock();
}

//stopwatch
const secondsElement = document.querySelector("#seconds");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

let seconds = 0;
let timerId = null; 

const startTimer = () => {
    if (!timerId) {
        timerId = setInterval(() => {
            seconds++;
            secondsElement.innerHTML = seconds;
        }, 1000);
    }
};
const stopTimer = () => {
    clearInterval(timerId);
    timerId = null; 
};
const resetTimer = () => {
    stopTimer();
    seconds = 0;
    secondsElement.innerHTML = seconds;
};
startButton?.addEventListener("click", startTimer);
stopButton?.addEventListener("click", stopTimer);
resetButton?.addEventListener("click", resetTimer);

//promise .then 
const doubleThenPromise = new Promise((resolve, reject) => {
    const successStep1 = true;
    if (successStep1) {
        resolve("Шаг 1 успешно пройден!");
    } else {
        reject("Шаг 1 завершился ошибкой!");
    }
});

doubleThenPromise
    .then((result1) => {
        console.log("Первый .then:", result1);
        return new Promise((resolve, reject) => {
            const successStep2 = false; 
            if (successStep2) {
                resolve("Шаг 2 успешно пройден!");
            } else {
                reject("Шаг 2 упал!");
            }
        });
    })
    .then((result2) => {
        console.log("Второй .then:", result2);
    })
    .catch((error) => {
        console.error("Ошибку перехватил .catch:", error);
    });

//async/await
function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail ? reject(new Error(`Ошибка при обработке: ${value}`)) : resolve(value);
        }, ms);
    });
}

// .then / .catch / .finally
console.log("ДЗ 3: Пункт 1");
delay(1, 500)
    .then((val1) => {
        console.log("Результат 1-го delay:", val1);
        return delay(val1 + 1, 500, true); 
    })
    .then((val2) => {
        console.log("Результат 2-го delay (пропустится):", val2);
        return delay(val2 + 1, 500);
    })
    .catch((err) => {
        console.error(".catch перехватил ошибку:", err.message);
    })
    .finally(() => {
        console.log(".finally сработал независимо от результата!");
    });

// последовательная обработка массива через async/await и for
const processArraySequentially = async () => {
    console.log("ДЗ 3: Пункт 2");
    const items = [10, 20, 30, 40];
    const results = [];

    for (const item of items) {
        try {
            const shouldFail = Math.random() > 0.7;
            const value = await delay(item, 500, shouldFail);
            results.push({ value, error: null });
        } catch (err) {
            results.push({ value: null, error: err.message });
        }
    }

    console.log("Результаты последовательной обработки массива:", results);
};
setTimeout(processArraySequentially, 2000);

// Promise.all, Promise.allSettled, Promise.race
const runParallelTasks = async () => {
    console.log("ДЗ 3: Пункт 3");
    try {
        await Promise.all([
            delay("A", 300),
            delay("B", 600),
            delay("C", 400, true), 
            delay("D", 800)
        ]);
    } catch (err) {
        console.error("Promise.all поймал ошибку:", err.message);
    }
    const settledResults = await Promise.allSettled([
        delay("A", 300),
        delay("B", 600),
        delay("C", 400, true),
        delay("D", 800)
    ]);
    const succeeded = settledResults
        .filter((item) => item.status === "fulfilled")
        .map((item) => item.value);
    const failed = settledResults
        .filter((item) => item.status === "rejected")
        .map((item) => item.reason.message);

    console.log("Promise.allSettled Uspeh (succeeded):", succeeded);
    console.log("Promise.allSettled Oshibki (failed):", failed);

    try {
        const raceWinner = await Promise.race([
            delay("Полезный результат", 2000), 
        ]);
        console.log("Победитель race:", raceWinner);
    } catch (err) {
        console.error("Promise.race проиграл (вызван таймаут):", err.message);
    }
};
setTimeout(runParallelTasks, 5000);
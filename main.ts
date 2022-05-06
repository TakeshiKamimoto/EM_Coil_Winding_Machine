// モーター２(巻き取り位置送り）制御
input.onPinPressed(TouchPin.P0, function () {
    if (ns > 0) {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P1, M2speed)
        basic.pause(450)
        ContinuousServo.turn_off_motor(DigitalPin.P1)
        ns += -1
    } else {
        ns = 32
        M2speed = M2speed * -1
    }
})
// 巻き取りモーターの起動・停止
// （トグルスイッチ）
input.onButtonPressed(Button.A, function () {
    toggleSW = toggleSW * -1
    if (toggleSW == 1) {
        pins.digitalWritePin(DigitalPin.P16, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
})
// カウンタ
input.onPinPressed(TouchPin.P2, function () {
    cnt += 1
    led.plot((cnt - 1) % 5, (cnt - 1) / 5)
    // 10の桁の繰り上げ
    if (cnt == 10) {
        digit10 += 1
        cnt = 0
        for (let xx = 0; xx <= 4; xx++) {
            for (let yy = 0; yy <= 1; yy++) {
                led.unplot(xx, yy)
            }
        }
        led.plot((digit10 - 1) % 5 + 0, (digit10 - 1) / 5 + 2)
        // 100の桁の繰り上げ
        if (digit10 == 10) {
            digit100 += 1
            digit10 = 0
            for (let xx = 0; xx <= 4; xx++) {
                for (let yy = 0; yy <= 1; yy++) {
                    led.unplot(xx, yy + 2)
                }
            }
            led.plot((digit100 - 1) % 5, (digit100 - 1) / 5 + 4)
        }
    }
})
let M2speed = 0
let ns = 0
let digit100 = 0
let digit10 = 0
let cnt = 0
let toggleSW = 0
toggleSW = 1
cnt = 0
digit10 = 0
digit100 = 0
// 巻き取り位置移動ピッチ0.2mm/半回転x32=6.4mm
ns = 32
M2speed = -20

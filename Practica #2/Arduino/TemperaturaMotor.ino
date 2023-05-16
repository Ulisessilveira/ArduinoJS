const int LM35_PIN = A1;
const int MOTOR_PIN = 12;
const int LED_PIN = 9;
const int LED_PIN1 = 10;


void setup() {
  Serial.begin(9600); // Inicialización de la comunicación serial para mostrar los resultados
  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_PIN1, OUTPUT);
}

void loop() {
  int lectura = analogRead(LM35_PIN); // Lee el valor analógico del pin del LM35
  float temperatura = (lectura * 5.0 / 1023.0) * 100.0; // Convierte el valor leído a temperatura en grados Celsius
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");
  
  if (temperatura < 20) {
    digitalWrite(LED_PIN, LOW); // Apagar LED1
    digitalWrite(LED_PIN1, HIGH); // Encender LED2
  } else {
    digitalWrite(LED_PIN, HIGH); // Encender LED1
    digitalWrite(LED_PIN1, LOW); // Apagar LED2
  }
  
  delay(1000); // Espera 1 segundo antes de la siguiente lectura
}

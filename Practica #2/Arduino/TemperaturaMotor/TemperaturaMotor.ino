#define LM35_PIN A5
#define MOTOR 12
#define MOTOR2 13
#define LED_PIN 9
#define LED_PIN1 10
double lectura;
double temp;
char letra;

void setup() {
  Serial.begin(9600); // Inicialización de la comunicación serial para mostrar los resultados
  pinMode(LM35_PIN,INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_PIN1, OUTPUT);
  pinMode(MOTOR,OUTPUT);
  pinMode(MOTOR2,OUTPUT);
  digitalWrite(MOTOR,LOW);
  digitalWrite(MOTOR2,LOW);
}

void loop() {
  lectura=analogRead(LM35_PIN);
  temp=(lectura*5*100)/1023;
  Serial.println(temp);

  if (Serial.available()>0){
    letra = Serial.read();
  }
  
  if (temp < 54) {
    digitalWrite(LED_PIN, LOW); // Apagar LED1
    digitalWrite(LED_PIN1, HIGH); // Encender LED2
    digitalWrite(MOTOR, LOW);
  } else {
    digitalWrite(LED_PIN, HIGH); // Encender LED1
    digitalWrite(LED_PIN1, LOW); // Apagar LED2
    digitalWrite(MOTOR, HIGH);
  }

  if(letra=='a'){
    digitalWrite(MOTOR2,HIGH);
  }
  if(letra=='b'){
    digitalWrite(MOTOR2,LOW);
  }
  
  delay(1000);
}

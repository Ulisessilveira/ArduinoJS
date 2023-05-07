#define pot A0
#define pot2 A1
#define led 10
char letra;
int lectura, lectura2, temperatura;

void setup() {
  // put your setup code here, to run once:
  pinMode(pot,INPUT);
  pinMode(pot2,INPUT);
  pinMode(led,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  lectura = analogRead(pot);
  lectura2 = analogRead(pot2);
  temperatura=map(lectura2,0,1023,0,100);
  Serial.println(lectura); //Escribir datos a PC
  Serial.println(temperatura);



  if (Serial.available()>0){
    letra = Serial.read();
  }
  if(letra=='a'){
    digitalWrite(led,HIGH);
  }
  if(letra=='b'){
    digitalWrite(led,LOW);
  }
  
  delay(100);
}

#define pot A0
#define LM35 A1

#define trigger 10
#define echo 11

#define led 9
char letra;
int lectura, lecturaLM35;
double t,d, temp;

void setup() {
  // put your setup code here, to run once:
  pinMode(pot,INPUT);
  
  pinMode(trigger,OUTPUT);
  pinMode(echo,INPUT);

  pinMode(LM35,INPUT);

  pinMode(led,OUTPUT);
  Serial.begin(9600);

  digitalWrite(trigger,LOW);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  digitalWrite(trigger,HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger,LOW);
  t=pulseIn(echo,HIGH);
  d=t/59; 
  
  lectura = analogRead(pot);

  lecturaLM35=analogRead(LM35);
  temp=(lecturaLM35*5*100)/1023;

  Serial.println(lectura); //Escribir datos a PC
  Serial.println(d); 
  Serial.println(temp); 

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

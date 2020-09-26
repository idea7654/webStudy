var 변수명 = 값;
var 변수명; => var 변수명 = null;
var food = {x: null, y: null}; === var x, y = null;
var s;

class랑 비슷한 개념의 생성자 함수

function Snake() {
    this.x = 10;
} //생성자 함수 -> (캡슐화) -> 객체지향언어의 특징

snake라는 공장, snake를 찍어냄.
s = new Snake();

console.log(s.x);

//객체지향

class x -> 생성자.

C#

function 클래스명() {
    this.ds = sadf;
    this.sdf = dsf;
}

git : 버전 관리 툴 //local
github : 원격저장소 //cloud

//git init

git add . //로컬에 파일 올림
git commit -m "my first git" //버전 확정
//git remote add origin https://github.com/idea7654/webStudy.git
git push origin master

git add .
git commit -m "메시지"
git push origin master
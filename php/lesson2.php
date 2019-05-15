<?php
/* 1)Какие типы паттернов проектирования существуют?*/
/**
 * Порождающие, поведенческие,структурные
 */
/* 2)Как можно улучшить Singleton при помощи trait-ов?*/

trait Singleton
{
    private static $instance;

    public function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    private function __construct()
    {
    }

    private function __wakeup()
    {
    }

    private function __clone()
    {
    }

}

class A
{
    use Singleton;
}

/*--------------------------------------------------------------------------------------------------------------------------*/

/* 3)Как реализуется паттерн «Фабричный метод»? В чем его отличие от паттерна «Фабрика»?*/

/*Отличается от фабрики тем, что реализует создание объектов одного типа, т.е. расширяется горизонтально,
в отличии от фабрики которая реазирует создание объектов разного типа, т.е. расширяется вертикально*/

abstract class News
{
    abstract function showNews();
}

class NativeNews extends News
{
    function showNews()
    {
        return "some show news about native aria";
    }
}

class CityNews extends News
{
    function showNews()
    {
        return "some show news about city";
    }
}

class NewsManager
{
    const NATIVE = 1;
    const CITY = 2;

    public function getNews($condition = 1)
    {
        switch ($condition) {
            case (self::CITY):
                return new CityNews();
            default:
                return new NativeNews();
        }
    }
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

/* 4)Объясните назначение и применение магических методов __get, __set, __isset, __unset, __call и __callStatic.
     Когда, как и почему их стоит использовать (или нет)?*/
/**
 * Метод
 * __get ( $property )-Вызывается при обращении к неопределенному
 * свойству
 * __set ( $property, $value)-Вызывается, когда неопределенному свойству присваивается
 * значение
 * __isset ( $property)-Вызывается, когда функция isset ( ) вызывается для
 * неопределенного свойства
 * __unset ( $property)-Вызывается, когда функция unset ( ) вызывается для
 * неопределенного свойства
 * __call ( $method, $ arg_array)-Вызывается при обращении к неопределенному нестатическому
 * методу
 * __callStatic ($method, $ arg_array)-Вызывается при обращении к неопределенному статическому
 * методу
 *
 * Плюсы использования - избвляют от рутинной работы кодинга однотипных методов и свойств
 * Минусы - Код становится сложным для понимания и соответственно для поддержки
 */
/*-----------------------------------------------------------------------------------------------------------------------------*/
/* 5)Описать несколько структур данных из стандартной библиотеки PHP (SPL). Привести примеры использования.*/
/**+
 * 1-Очередь
 * 2-Стек
 * Очередь и стек связанные списки, где узлом является элемент плюс ссылка на соседний узел,
 * отличаются только методом извлечения элементов,
 * Очередь-FIFO
 * стек-LIFO
 *
 * 3-Куча
 * --Куча являются древовидными структурами: каждый узел больше или равен своим потомкам,
 * при этом для сравнения используется внедренный метод сравнения, который является общим для всей кучи.
 * SplHeap реализует основную функциональность кучи и является абстрактным классом.
 */
$heap = new SplMaxHeap();
$heap->insert('111');
$heap->insert('666');
$heap->insert('777');

echo $heap->extract(); // 777
echo $heap->extract(); // 666
echo $heap->extract(); // 111
/*------------------------------------------------------------*/
$stack = new SplStack();

// добавляем элемент в стек
$stack->push('1');
$stack->push('2');
$stack->push('3');

echo $stack->count(); // 3
echo $stack->top(); // 3
echo $stack->bottom(); // 1
echo $stack->serialize(); // i:6;:s:1:"1";:s:1:"2";:s:1:"3";

// извлекаем элементы из стека
echo $stack->pop(); // 3
echo $stack->pop(); // 2
echo $stack->pop(); // 1
/*-----------------------------------------------------------*/
$queue = new SplQueue();

$queue->setIteratorMode(SplQueue::IT_MODE_DELETE);

$queue->enqueue('one');
$queue->enqueue('two');
$queue->enqueue('qwerty');

$queue->dequeue();
$queue->dequeue();

echo $queue->top(); // qwerty
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * 6. Найдите все ошибки в коде:
 */
interface MyInt
{
    public function funcI();

    /*видимость метода интерфейса должена быть public*/
    private function funcP();
}

class AA
{
protected prop1;
private prop2;

    function funcA()
    {
        return $this->prop2;
    }
}

class B extends AA
{
    function funcB()
    {
        return $this->prop1;
    }
}

class C extends B implements MyInt
{
/*должен быть имплементирован  метод интерфейса MyInt funcI()*/
    function funcB()
    {
        return $this->prop1;
    }

    private function funcP()
    {
        return 123;
    }
}

$b = new B();
$b->funcA();
$c = new C();
$c->funcI();
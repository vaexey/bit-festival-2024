# jodd.ly

Findy your hobby.
This site was built during [Bit Festival 2024](https://bit.bestgliwice.pl/)

---

## What is jodd.ly?

jodd.ly is a service that helps you discover a new hobbies. Uses Meta's `LLama` to process your data and return you the most fitting hobby.

## Installation

#### 1. Stable version

> [!WARNING]
> No stable version has been released yet.

#### 2. Requirements

> [!IMPORTANT]
> This project requires [Node JS](https://nodejs.org/en) and [Groq](https://groq.com/) Api Key token.

#### 3. Latest version

Clone this repository

```
git clone https://github.com/vaexey/bit-festival-2024
```

## Usage

Create file API_KEY.json under this location

```
cd .\back\src\
```

JSON should like this

```
{
  "groq": "YOUR GROQ API KEY"
}
```

And execute this commands

```
cd .\back\src\
npm install
npx tsc
npm start
```

Next move to this location and execute this commands

```
cd .\front\src\routes\
npm install
npm run dev -- --open
```

## Important notes

> [!CAUTION]
> Use this code at your own risk.

## License

The software is licensed under [MIT NON-AI License]()

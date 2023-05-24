-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "searchID" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "oneWordReview" TEXT NOT NULL,
    "similar" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "searchTerm" TEXT NOT NULL,
    "sessionID" TEXT,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_searchID_key" ON "Result"("searchID");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_searchID_fkey" FOREIGN KEY ("searchID") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
